<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Community;

class Post extends Model
{
    use HasFactory;

    protected  $fillable = ['title','text_content', 'media_url', 'user_id', 'community_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved', 'post_id', 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
