<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected  $fillable = ['title','text_content', 'media_url', 'user_id', 'community_id'];
}
