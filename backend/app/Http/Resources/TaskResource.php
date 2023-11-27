<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'parent_id' => $this->parent_id,
            'prompt' => $this->prompt,
            'with_image' => $this->with_image,
            'model' => $this->model,
            'user_id' => $this->user_id,
            'error_message' => $this->error_message,
            'created_id' => $this->created_id,
            'status' => $this->status,
        ];
    }
}
