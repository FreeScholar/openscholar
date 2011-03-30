<?php

/**
 * Implementation of hook_spaces_presets().
 */
function os_spaces_presets() {
  $export = array();
  $spaces_presets = new stdClass;
  $spaces_presets->disabled = FALSE; /* Edit this to true to make a default spaces_presets disabled initially */
  $spaces_presets->api_version = 3;
  $spaces_presets->name = 'os_personal';
  $spaces_presets->title = 'OS personal';
  $spaces_presets->description = 'OpenScholar personal site';
  $spaces_presets->space_type = 'og';
  $spaces_presets->value = array(
    'variable' => array(
      'spaces_features' => array(
        'scholar_biocv' => '1',
        'scholar_blog' => '1',
        'scholar_classes' => '1',
        'scholar_book' => '0',
        'scholar_dvn' => '0',
        'scholar_events' => '0',
        'scholar_image_gallery' => '0',
        'scholar_pages' => '0',
        'scholar_publications' => '0',
        'scholar_reader' => '0',
      ),
      'spaces_og_selective' => '0',
      'spaces_og_register' => 1,
      'spaces_og_directory' => 1,
      'spaces_og_private' => 0,
      'site_frontpage' => 'classes',
      'site_frontpage_path' => 'classes',
      'default_theme' => 'scholar_airstream',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('OS personal');
  t('OpenScholar personal site');

  $export['os_personal'] = $spaces_presets;
  return $export;
}