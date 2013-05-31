(function ($) {
  Drupal.behaviors.toggleFieldset = {
    attach: function (context, settings) {
      var title = $('#views-exposed-form-gsb-workbench-recent-content-page-1 .fieldset-title'),
            title1 ='More filters',
            title2 = 'Less filters';
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
  }
}(jQuery));

