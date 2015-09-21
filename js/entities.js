function Stick(id) {
    this.dom = document.getElementById('stick' + id);
    this.removed = false;
}

Stick.prototype.remove = function() {
    this.dom.style.display = 'none';
    this.removed = true;
};

Stick.prototype.revive = function() {
    this.dom.style.display = 'inline';
    this.removed = false;
};

function Row(sticks) {
    this.sticks = sticks;
    this.empty = false;
}

Row.prototype.attEmpty = function() {
    for (var i = 0; i < this.sticks.length; i++) {
        if (!this.sticks[i].removed) {
            this.empty = false;
            return;
        }
    }

    this.empty = true;
};

Row.prototype.removeStick = function() {
    if (this.empty) {
        return;
    }

    var i = 0;
    for (i; i < this.sticks.length; i++) {
        if (this.sticks[i].removed) {
            continue;
        }

        this.sticks[i].remove();
        break;
    }

    this.attEmpty();
};

function RemoveButton(dom, row) {
    this.dom = dom;
    this.row = row;
}

RemoveButton.prototype.disable = function() {
    this.dom.setAttribute('disabled', true);
};

RemoveButton.prototype.enable = function() {
    this.dom.removeAttribute('disabled');
};

RemoveButton.prototype.disabled = function() {
    return this.dom.getAttribute('disabled');
};

RemoveButton.prototype.click = function() {
    this.row.removeStick();
    return this.row.empty;
};
