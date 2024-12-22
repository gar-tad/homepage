<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCompanyRequest;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreCompanyLogoRequest;
use Illuminate\Database\Eloquent\Collection;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Collection
    {
        $companies = $request->user()->companies()
            ->filtered($request->search)
            ->orderBy('updated_at', 'desc')
            ->get();

        return $companies;
    }

    public function getArchived(Request $request): Collection
    {
        return $request->user()->companies()->onlyTrashed()->orderBy('updated_at', 'desc')->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request): Company
    {
        $company = $request->user()->companies()->create($request->all());
        return $company;
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company): Company
    {
        Gate::authorize('view', $company);

        return $company;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCompanyRequest $request, Company $company): Company
    {
        Gate::authorize('update', $company);

        $company->update($request->all());
        return $company;
    }

    public function setLogo(StoreCompanyLogoRequest $request, Company $company): Company
    {
        Gate::authorize('update', $company);

        $company->setLogo($request->file('logo'));
        return $company;
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company): void
    {
        Gate::authorize('delete', $company);

        $company->setLogo(null);
        $company->delete();
    }
}
