<?php

function gsb_theme_admin_preprocess_html(&$vars) {
  global $user;
  if (in_array('Faculty', $user->roles)) {
    $vars['classes_array'][] = 'faculty-role';
  }

}

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

  // Add a hidden element to track if the form has changed, to persist through
  // validation.
  $form['gsb_has_changed'] = array(
    '#type' => 'hidden',
    '#default_value' => FALSE,
  );
}

/**
 * #process callback for all managed file elements.
 */
function gsb_theme_admin_managed_file_process($element, &$form_state) {
  // If there is a remove button, mark it with a data attribute.
  if (isset($element['remove_button'])) {
    $element['remove_button']['#attributes']['data-gsb-form-type'] = 'remove_button';
  }
  return $element;
}

/**
 * Implements hook_element_info_alter().
 */
function gsb_theme_admin_element_info_alter(&$type) {
  if (isset($type['managed_file'])) {
    $type['managed_file']['#process'][] = 'gsb_theme_admin_managed_file_process';
  }
}
