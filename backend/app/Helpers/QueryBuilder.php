<?php
namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Community;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

class QueryBuilder
{
    public static function post($query, Request $request, $community = null, $user = null)
    {   
        // Type check on the query
        if (!($query instanceof Builder || $query instanceof Relation)) {
            throw new \InvalidArgumentException('The $query parameter must be an instance of Builder or Relation.');
        }
        
        // Get the keyword from the request
        $keyword = $request->get('keyword');

        // Get the order_by and direction from the request or set default values
        $order_by = $request->get('order_by') ?? 'created_at';
        $direction = $request->get('direction') ?? 'asc';

        // If there is a keyword, add a where clause
        if ($keyword) {
            $query->where('posts.title', 'like', "%{$keyword}%")->orWhere('posts.text_content', 'like', "%{$keyword}%");
        }

        // Add order by clause with provided values or default values
        $query->orderBy('posts.'.$order_by, $direction);

        // If there is a community_id, add a where clause
        if ($community) {
            $query->where('posts.community_id', $community['id']);
        }

        // If there is a user_id, add a where clause
        if ($user) {
            $query->where('posts.user_id', $user['id']);
        }

        // If the user is auth, also include savedByUsers for the relation to be loaded
        if (Auth::guard('sanctum')->user()) {
            $query->with('savedByUsers');
        }

        // Load community/user for the relation to be loaded
        $query->with('community')->with('user');

        // Create the collection and return it
        return $query;
    }
}