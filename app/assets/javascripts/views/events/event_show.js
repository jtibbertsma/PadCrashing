PadCrashing.Views.EventShow = Backbone.CompositeView.extend({
  template: JST["events/show"],
  className: "container-fluid",

  events: {
    "click .destroy": "destroyEvent",
    "click .edit": "editEvent"
  },

  initialize: function () {
    this.addSubview(
      ".main-attender-list",
      new PadCrashing.Views.EventAttenderHolder({
        model: this.model
      })
    );
    this.addSubview(
      ".show-join",
      new PadCrashing.Views.EventJoinButton({
        model: this.model,
        attenders: this.model.attenders()
      })
    );
    this.listenTo(this.model, "sync", this.render);
  },

  destroyEvent: function () {
    // TODO: have a box pop up and ask 'are you sure?''
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("#events", { trigger: true });
      }
    });
  },

  editEvent: function () {
    PadCrashing.Utils.renderEventForm({ model: this.model });
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.attachSubviews();

    this.model.background && this.$(".event-show-head-background").css(
      "background-image",
      "url(" + this.model.background.escape("image_url") + ")"
    );
    return this;
  }
});