
/**
 * @fileoverview Application Constants for Cookie Cutter Monster
 * 
 * This file contains all constant values used throughout the application.
 * These constants define default settings, limits, and feature flags that
 * control application behavior and user experience.
 * 
 * @author Cookie Cutter Monster Team
 * @version 1.0.0
 * @since 2020-08-01
 */

/** 
 * Debug flag for camera position overlay display
 * When true, shows camera coordinates in development builds
 */
export const CAMERA_DEBUG = false;

/**
 * Default cookie cutter wall thickness in millimeters
 * Optimized for most 3D printers and provides good cutting performance
 */
export const DEFAULT_THICKNESS = 1;

/**
 * Default cookie cutter cutting depth in millimeters
 * Standard depth suitable for most cookie dough thicknesses
 */
export const DEFAULT_DEPTH = 16;

/**
 * Default point tolerance for geometry simplification
 * Lower values = higher quality/larger files, higher values = faster/smaller files
 */
export const DEFAULT_TOLERANCE = .15;

/**
 * Default bevel setting for cutting edge
 * False provides simpler geometry, true creates sharper cutting edges
 */
export const DEFAULT_BEVEL = false;

/**
 * Default handle rounding setting
 * False creates square handles, true creates rounded handles for comfort
 */
export const DEFAULT_ROUND_HANDLE = false;

/**
 * Default cookie cutter size in millimeters (corresponds to 3 inches)
 * Represents the maximum dimension of the final cookie cutter
 */
export const DEFAULT_SIZE = 76;

/**
 * Maximum canvas dimension in pixels for image processing
 * Limits memory usage and processing time while maintaining quality
 */
export const MAX_DIM = 500;
