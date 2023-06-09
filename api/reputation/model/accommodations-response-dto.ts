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


import { LocationAccommodationResponseDto } from './location-accommodation-response-dto';

/**
 * 
 * @export
 * @interface AccommodationsResponseDto
 */
export interface AccommodationsResponseDto {
    /**
     * 
     * @type {number}
     * @memberof AccommodationsResponseDto
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof AccommodationsResponseDto
     */
    nameFa?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AccommodationsResponseDto
     */
    nameEn?: string | null;
    /**
     * 
     * @type {LocationAccommodationResponseDto}
     * @memberof AccommodationsResponseDto
     */
    city?: LocationAccommodationResponseDto;
    /**
     * 
     * @type {LocationAccommodationResponseDto}
     * @memberof AccommodationsResponseDto
     */
    province?: LocationAccommodationResponseDto;
}


