function Spinner(data)
{
    this.type = Spinner.id;

    this.endTime = this.time;

    //if (this instanceof Spinner)
    //{
    //    this.parse(data);
    //}
    //else
    //{
    //    Spinner.prototype.parse.call(this, data);
    //}
    Spinner.parse.call(this, data);

    this.draw = Spinner.draw;
}
Spinner.id = 8;
//Spinner.prototype = Object.create(HitObject.prototype);
//Spinner.prototype.constructor = Spinner;
Spinner.parse = function(data)
{
    this.endTime = data[0] / 1000;
};
Spinner.draw = function(time)
{
    var opacity = 1;
    if (time < this.time)
    {
        opacity = 1 - (this.time - time) / 0.4;
    }
    else if (time > this.endTime)
    {
        opacity = 1 - (time - this.endTime) / 0.2;
    }
    Player.ctx.globalAlpha = Math.max(0, Math.min(opacity, 1));
    // spinner
    Player.ctx.beginPath();
    Player.ctx.arc(this.x, this.y, Player.getLength(200), -Math.PI, Math.PI);
    Player.ctx.fillStyle = 'rgba(0,0,0,.4)';
    Player.ctx.fill();
    Player.ctx.strokeStyle = '#fff';
    Player.ctx.lineWidth = Player.getLength(10);
    Player.ctx.shadowBlur = Player.getLength(10);
    Player.ctx.stroke();
    // approach
    if (time >= this.time && time <= this.endTime)
    {
        var dtp = 1 - (time - this.time) / (this.endTime - this.time);
        Player.ctx.beginPath();
        Player.ctx.arc(this.x, this.y, Player.getLength(192.5) * dtp, -Math.PI, Math.PI);
        Player.ctx.lineWidth = 8 * dtp;
        Player.ctx.shadowBlur = 3;
        Player.ctx.stroke();
    }
};