(function ($) {

  Drupal.behaviors.editingMessage = {
    attach: function () {
      // Loop through each form to set up editing tracking.
      var $form = $('form.node-form').once(function () {
        new Drupal.GsbThemeAdminEditing(this);
      });

      // Add the event listener to display a message before leaving the page.
      if (window.addEventListener) {
        window.addEventListener('beforeunload', function (e) {
          // If the form has been changed but not submitted, confirm leaving.
          if ($form.data('changed')) {
            e = e || window.event;
            e.returnValue = Drupal.t("You've made changes on one or more tabs. Click 'Save and Publish' to save all changes!");
          }
        }, true);
      }
    }
  };

  Drupal.GsbThemeAdminEditing = function (form) {
    var $form = $(form);
    // If the form had changed before a submission, mark it as changed now.
    var $persistChangedValue = $form.find("[name='gsb_has_changed']");
    if ($persistChangedValue.val()) {
      $form.data('changed', true);
    }

    function markAsChanged () {
      if (!$form.data('changed')) {
        $form.data('changed', true);
      }
    }

    // Track changes and input to all input elements.
    $form.find(':input').not('.gsb-form-message-optout').once()
      .on('change input', markAsChanged)
      // Additionally, track clicks on "remove" buttons.
      .filter("[data-gsb-form-type='remove_button']")
      .on('mousedown', markAsChanged);

    $form.submit(function () {
      // If this form has been changed, persist that value.
      if ($(this).data('changed')) {
        $persistChangedValue.val(true);
      }

      // Allow the form submission to proceed.
      $(this).data('changed', false);
    });
  };

  /**
   * When a row is moved via tabledrag, mark the form as changed.
   */
  Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
    $(swappedRow).closest('form').data('changed', true);
  };

}(jQuery));
