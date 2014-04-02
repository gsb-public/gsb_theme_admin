<?php

function gsb_theme_admin_form_panelizer_edit_content_form_alter(&$form, &$form_state, $form_id) {
  $form['display']['#markup'] = $form['display']['#markup'] . '<div class="clearfix"></div>';
}

/**
 * Overrides theme_file_icon().
 *
 * Remove file icon.
 */
function gsb_theme_admin_file_icon($variables) {
  return '';
}

/**
 * Implements hook_form_BASE_FORM_ID_alter() for node_form.
 */
function gsb_theme_admin_form_node_form_alter(&$form, &$form_state, $form_id) {
  // Make the title field 140 characters wide.
  if (isset($form['title'])) {
    $form['title']['#size'] = 140;
  }
  $form['#attached']['js'][] = drupal_get_path('theme', 'gsb_theme_admin') . '/js/editing_message.js';
}
