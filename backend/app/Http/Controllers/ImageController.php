<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Client;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    public static function downloadImage($imageUrl)
    {
        // Set image name
        $imageName = uniqid() . '.jpg';

        // Download the image from the url
        $client = new Client();
        $response = $client->get($imageUrl);

        // Save the image
        Storage::disk('public')->put($imageName, $response->getBody());

        // Make a small version of the image
        Image::make(public_path('storage/' . $imageName))->resize(300, 300)->save(public_path('storage/sm-' . $imageName));

        // Make a medium version of the image
        Image::make(public_path('storage/' . $imageName))->resize(512, 512)->save(public_path('storage/md-' . $imageName));

        // Return the image name to save it in the database
        return $imageName;
    }
}