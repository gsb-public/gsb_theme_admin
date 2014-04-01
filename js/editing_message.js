(function ($) {

  Drupal.behaviors.editingMessage = {
    attach: function () {
      var $form = $('form.node-form');
      $form.FormObserve({
        changeClass: false,
        msg: Drupal.t("You've made changes on one or more tabs. Click 'Save and Publish' to save all changes!")
      });

      // Allow submit buttons to bypass the message.
      $form.submit(function () {
        $(this).FormObserve_save();
      })
    }
  };

  /**
   * Prevent tabledrag from showing a message.
   */
  Drupal.theme.prototype.tableDragChangedWarning = function () {
  }

}(jQuery));
