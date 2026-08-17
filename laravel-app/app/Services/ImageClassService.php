<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ImageClassService
{
    protected string $disk;
    protected string $path;

    public function __construct(string $path = 'profiles', string $disk = 'public')
    {
        $this->path = $path;
        $this->disk = $disk;
    }

    public static function forUserModel(): self
    {
        return new self('profiles', 'public');
    }

    public function store(UploadedFile $file): string
    {
        return $file->store($this->path, $this->disk);
    }

    public function delete(?string $path): bool
    {
        if (empty($path)) {
            return false;
        }

        if (Storage::disk($this->disk)->exists($path)) {
            return Storage::disk($this->disk)->delete($path);
        }

        return false;
    }

    public function fullUrl(?string $path): ?string
    {
        if (empty($path)) {
            return null;
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        return url(Storage::disk($this->disk)->url($path));
    }

    public function thumbnailPath(?string $path): ?string
    {
        if (empty($path)) {
            return null;
        }

        // Without an image library, we just return the same path
        return $path;
    }
}
