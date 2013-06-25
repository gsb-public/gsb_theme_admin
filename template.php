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