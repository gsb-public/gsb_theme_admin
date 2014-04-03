(function ($) {

  Drupal.behaviors.editingMessage = {
    attach: function () {
      var $form = $('form.node-form');
      // Track changes to all input elements.
      $form.find(':input').not('.gsb-form-message-optout').change(function () {
        $form.data('changed', true);
      });
      // Submitting a form ignores all changes.
      $form.submit(function () {
        $(this).data('changed', false);
      });

      // If the form has been changed but not submitted, confirm leaving.
      function editingBeforeUnload (e){
        if ($form.data('changed')) {
          e = e || window.event;
          e.returnValue = Drupal.t("You've made changes on one or more tabs. Click 'Save and Publish' to save all changes!");
        }
      }

      if (window.attachEvent) {
        window.attachEvent('onbeforeunload', editingBeforeUnload);
      }
      else if (window.addEventListener) {
        window.addEventListener('beforeunload', editingBeforeUnload, true);
      }
    }
  };

  /**
   * Prevent tabledrag from showing a message.
   */
  Drupal.theme.prototype.tableDragChangedWarning = function () {
  }

  /**
   * When a row is moved via tabledrag, mark the form as changed.
   */
  Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
    $(swappedRow).closest('form').data('changed', true);
  };

}(jQuery));
