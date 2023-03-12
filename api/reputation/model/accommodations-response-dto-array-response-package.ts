/* tslint:disable */
/* eslint-disable */
/**
 * Accommodation Service - Accommodation Owner APIs
 * Api Documentation for Accommodation Owner Users
 *
 * The version of the OpenAPI document: Accommodation Owner
 * Contact: amir.hossein.khalouei@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { AccommodationsResponseDto } from './accommodations-response-dto';

/**
 * 
 * @export
 * @interface AccommodationsResponseDtoArrayResponsePackage
 */
export interface AccommodationsResponseDtoArrayResponsePackage {
    /**
     * 
     * @type {string}
     * @memberof AccommodationsResponseDtoArrayResponsePackage
     */
    errorMessage?: string | null;
    /**
     * 
     * @type {Array<AccommodationsResponseDto>}
     * @memberof AccommodationsResponseDtoArrayResponsePackage
     */
    result?: Array<AccommodationsResponseDto> | null;
    /**
     * 
     * @type {boolean}
     * @memberof AccommodationsResponseDtoArrayResponsePackage
     */
    success?: boolean;
}


