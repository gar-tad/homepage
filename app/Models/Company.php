<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'logo'
    ];

    protected $appends = ['logo_url'];

    public function post(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function logoUrl(): Attribute
    {
        return new Attribute(
            get: fn () => asset($this->logo),
        );
    }

    public function setLogo($uploadedLogo): void
    {
        if ($this->logo) $this->removeLogo();

        if (!$uploadedLogo) {
            $this->save();
            return;
        }

        $path = Storage::disk('public')->put('images/company_logos', $uploadedLogo);
        $this->logo = $path;
        $this->save();
    }

    private function removeLogo(): void
    {
        Storage::disk('public')->delete($this->logo);
        $this->logo = null;
    }

    public function scopeFiltered(Builder $query, string $params ): void
    {
        $params = json_decode($params);

        if ($params->name) {
            $query->where('name', 'like', '%' . $params->name . '%');
        }

        if ($params->email) {
            $query->where('email', 'like', '%' . $params->email . '%');
        }
    }
}
