(function ($) {

  Drupal.behaviors.editingMessage = {
    attach: function () {
      $('form.node-form').FormObserve({
        changeClass: false,
        msg: Drupal.t("You've made changes on one or more tabs. Click 'Save and Publish' to save all changes!")
      });
    }
  };

  /**
   * Prevent tabledrag from showing a message.
   */
  Drupal.theme.prototype.tableDragChangedWarning = function () {
  }

}(jQuery));
