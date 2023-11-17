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

        // If there is a keyword, add a where clause
        if ($keyword) {
            $query->where('posts.title', 'like', "%{$keyword}%")->orWhere('posts.text_content', 'like', "%{$keyword}%");
        }

        // Get the order_by from the request
        $order_by = $request->get('order_by');
        
        // Add the order_by clause to the query
        $query = QueryBuilder::orderBy($query, $order_by);

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

        return $query;
    }

    public static function orderBy($query, String $request_order_by = null)
    {
        // Set default value
        $order_by = 'created_at';
        $direction = 'desc';

        // If there is a request_order_by, set the order_by and direction accordingly
        if ($request_order_by && $request_order_by === 'old') {
            $order_by = 'created_at';
            $direction = 'asc';
        }

        // Add the clause to the query
        $query->orderBy($order_by, $direction);

        return $query;
    }
}