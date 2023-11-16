<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\Community;
use App\Models\Saved;
use Illuminate\Support\Facades\Auth;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {   
        $currentUser = Auth::guard('sanctum')->user();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'text_content' => $this->text_content,
            'media_url' => $this->media_url,
            'user_id' => $this->user_id,
            'username' => $this->relationLoaded('user') ? $this->user->username : null,
            'saved' => $currentUser && $this->relationLoaded('savedByUsers') ? $this->savedByUsers->contains($currentUser) : null,
            'community_id' => $this->community_id,
            'community_name' => $this->relationLoaded('community') ? $this->community->name : null,
        ];
    }
}
