<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected  $fillable = ['type', 'parent_id', 'inspiration', 'with_image', 'model'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}