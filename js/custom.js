(function ($) {
  Drupal.behaviors.toggleFieldset = {
    attach: function (context, settings) {
      var title = $('#views-exposed-form-gsb-workbench-recent-content-page-1 .fieldset-title'),
            title1 ='More filters',
            title2 = 'Fewer filters';
      if (title.parents('legend').next().is(':visible')) {
        title.html(title2);
      } else {
        title.html(title1);
      }
      title.click(function() {
        var $this =$(this);
        if ($this.text() === title1) {
          $this.text(title2);
        } else {
          $this.text(title1);
        }
      });
    }
  };

  Drupal.behaviors.preventHorizontalFieldsetFocus = {
    attach: function (context, settings) {
      // Horizontal tabs are binding keydown that switches focus on fielset legend when hiting Enter, we don't want this.
      $('.horizontal-tabs-processed', context).once('horizontal-tabs-override', function () {
        var $fieldsets = $('> fieldset', this);
        if ($fieldsets.length == 0) {
          return;
        }
        $fieldsets.each(function () {
          // Unbind horizontal-tabs.js behaviour and bind our own keydown to prevent for submission.
          $(this).unbind('keydown').bind('keydown', function (event) {
            if (event.keyCode == 13 && event.target.nodeName != "TEXTAREA") {
              return false;
            }
          });
        });
      });
    }
  }

}(jQuery));
