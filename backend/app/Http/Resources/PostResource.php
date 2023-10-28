<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\Community;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'text_content' => $this->text_content,
            'media_url' => $this->description,
            'user_id' => $this->user_id,
            'username' => User::find($this->user_id)->username,
            'community_id' => $this->community_id,
            'community_name' => Community::find($this->community_id)->name,
        ];
    }
}
