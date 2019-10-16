var ToggleModeule = {
    isShow: (this.display == "none") ? false : true,
    show: function() {
        this.display = "block";
        this.isShow = true;
    },
    hide: function() {
        this.display = "none";
        this.isShow = false;
    },
    toggle: function() {
        if(this.isShow) this.hide();
        else this.show();
    }
}