
/**
 * @fileoverview TypeScript Type Definitions for Cookie Cutter Monster
 * 
 * This file contains all TypeScript interfaces and type definitions used throughout
 * the Cookie Cutter Monster application. These types ensure type safety and provide
 * clear contracts for data structures passed between components.
 * 
 * @author Cookie Cutter Monster Team
 * @version 1.0.0
 * @since 2020-08-01
 */

/**
 * Camera position and rotation state for Three.js scene debugging
 * 
 * Used by the camera debug component to track and display camera movement
 * in 3D space. All rotation values are in radians.
 */
export interface camera_pos_t {
    /** Camera X position coordinate */
    x: number,
    /** Camera Y position coordinate */
    y: number,
    /** Camera Z position coordinate */
    z: number,
    /** Camera rotation around X axis (pitch) in radians */
    rx: number,
    /** Camera rotation around Y axis (yaw) in radians */
    ry: number,
    /** Camera rotation around Z axis (roll) in radians */
    rz: number
}

/**
 * Complete application state for cookie cutter configuration and image data
 * 
 * This interface defines the shape of the global application state, containing
 * all user selections and image processing data needed to generate a cookie cutter.
 * State updates are partial - not all properties need to be present in every update.
 */
export interface CookieState_t {
    /** Base64 or blob URL of the selected image */
    imageSrc: string,
    /** Original image height in pixels */
    imageHeight: number,
    /** Original image width in pixels */
    imageWidth: number,
    /** Base filename for STL export (without extension) */
    saveFileName: string,
    /** Wall thickness of cookie cutter in millimeters */
    thickness: number,
    /** Cutting depth of cookie cutter in millimeters */
    depth: number,
    /** Point tolerance for geometry simplification (smaller = higher quality) */
    tolerance: number,
    /** Whether to apply beveled cutting edge for sharper cuts */
    cutterBevel: boolean,
    /** Whether cookie cutter handle should have rounded edges */
    handleRound: boolean,
    /** Maximum size dimension of cookie cutter in millimeters */
    size: number,
    /** Current camera position for debug purposes */
    camera_pos: camera_pos_t
}

/**
 * Extended HTML input event interface with properly typed target
 * 
 * Standard Event interface doesn't guarantee the target is an HTMLInputElement.
 * This interface ensures type safety when handling input events from form controls.
 */
export interface HTMLInputEvent extends Event {
    /** Guaranteed to be an HTMLInputElement for accessing .value, .checked, etc. */
    target: HTMLInputElement & EventTarget;
}
