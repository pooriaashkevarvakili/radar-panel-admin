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


import { CommentSourceDetailsDto } from './comment-source-details-dto';

/**
 * 
 * @export
 * @interface CommentSourceDetailsDtoIEnumerableResponsePackage
 */
export interface CommentSourceDetailsDtoIEnumerableResponsePackage {
    /**
     * 
     * @type {string}
     * @memberof CommentSourceDetailsDtoIEnumerableResponsePackage
     */
    errorMessage?: string | null;
    /**
     * 
     * @type {Array<CommentSourceDetailsDto>}
     * @memberof CommentSourceDetailsDtoIEnumerableResponsePackage
     */
    result?: Array<CommentSourceDetailsDto> | null;
    /**
     * 
     * @type {boolean}
     * @memberof CommentSourceDetailsDtoIEnumerableResponsePackage
     */
    success?: boolean;
}


