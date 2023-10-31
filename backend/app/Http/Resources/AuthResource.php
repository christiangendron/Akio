<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {   
        return [
            'user' => [
                'id' => $this->id,
                'username' => $this->username,
                'email' => $this->email,
                'is_admin' => $this->is_admin,
            ],
            'token' => $this->createToken($this->id.auth()->id())->plainTextToken
        ];
    }
}
