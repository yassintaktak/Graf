/*
*    _____ _____            ______
*  / ____|  __ \     /\   |  ____|
* | |  __| |__) |   /  \  | |__
* | | |_ |  _  /   / /\ \ |  __|
* | |__| | | \ \  / ____ \| |
*  \_____|_|  \_\/_/    \_\_|
*
* Author : Yessine Taktak
* Javascript charts system using HTML5 Canvas
*/

var Graf = {
  m_chartType : null,
  m_canvas : null,
  m_context : null,
  m_width : null,
  m_height : null,
  m_color : null,
  m_style : null,
  /* Graf settings */
  m_graf_link : true,
  /* Script Reserved */
  m_labels : null,
  m_data : null,
  m_dataCords : {},
  m_labelsCords : {},

  initialize : function(canvas, prop, settings, mstyle) {
    try {
      var obj = Object.create(this);
      var style = document.createElement("style");
      style.innerHTML = "body { margin : 0 !important; padding : 0 !important; } #"+canvas+" { display : block; }";
      document.head.appendChild(style);
      obj.m_canvas = document.getElementById(canvas);
      obj.m_context = obj.m_canvas.getContext("2d");
      prop = prop || {};
      obj.m_style = mstyle || {};
      prop.hasOwnProperty("chartType") ? obj.m_chartType = prop.chartType : obj.m_chartType = "normal";
      prop.hasOwnProperty("width") ? obj.m_width = prop.width : obj.m_width = window.innerWidth;
      prop.hasOwnProperty("height") ? obj.m_height = prop.height : obj.m_height = window.innerHeight;
      obj.m_canvas.width = obj.m_width;
      obj.m_canvas.height = obj.m_height;
      obj.m_canvas.style = "padding : 0; margin : 0;";
      prop.hasOwnProperty("color") ? obj.m_color = prop.color : obj.m_color = "#000000";
      settings.hasOwnProperty("linker") ? obj.m_graf_link = settings.linker : obj.m_graf_link = true;
      return obj;
    } catch(e) {
      console.log("Graf : A little bug is flying right there : "+e);
    }
  },
  drawCanvas : function() {
    try {
      switch(this.m_chartType) {
        case "normal":
          var context = this.m_context;
          context.beginPath();
          var color = this.m_color;
          this.m_style.hasOwnProperty("xaxis_color") ? color = this.m_style.xaxis_color : color = this.m_color;
          context.strokeStyle = color;
          context.lineWidth = 1;
          context.moveTo(40, 25);
          context.lineTo(40, this.m_height-40);
          context.stroke();
          context.beginPath();
          var color = this.m_color;
          this.m_style.hasOwnProperty("yaxis_color") ? color = this.m_style.yaxis_color : color = this.m_color;
          context.strokeStyle = color;
          context.moveTo(40, this.m_height-40);
          context.lineTo(this.m_width-34, this.m_height-40);
          context.stroke();
          break;
        case "cartesian":
          var context = this.m_context;
          context.beginPath();
          var color = this.m_color;
          this.m_style.hasOwnProperty("xaxis_color") ? color = this.m_style.xaxis_color : color = this.m_color;
          context.strokeStyle = color;
          context.lineWidth = 1;
          context.moveTo(this.m_width/2, 25);
          context.lineTo(this.m_width/2, this.m_height-40);
          context.stroke();
          context.beginPath();
          var color = this.m_color;
          this.m_style.hasOwnProperty("yaxis_color") ? color = this.m_style.yaxis_color : color = this.m_color;
          context.strokeStyle = color;
          context.moveTo(280, this.m_height/2);
          context.lineTo(this.m_width-280, this.m_height/2);
          context.stroke();
          break;
      }
    } catch(e) {
      console.log("Graf : A little bug is flying right there : "+e);
    }
  },
  drawTable : function() {
    var context = this.m_context;
    var xspacing = 27.5,
        yspacing = 30;
    context.beginPath();
    this.m_style.hasOwnProperty("table_lwidth") ? context.lineWidth = this.m_style.table_lwidth : context.lineWidth = 0.1;
    this.m_style.hasOwnProperty("table_xspacing") ? xpacing = this.m_style.table_xspacing : xpacing = 27.5;
    this.m_style.hasOwnProperty("table_yspacing") ? ypacing = this.m_style.table_xspacing : ypacing = 30;
    for (var x = -15; x <= this.m_width; x += xpacing) {
      context.moveTo(x, 0);
      context.lineTo(x, this.m_height);
    }
    for (var y = -15; y <= this.m_height; y += ypacing) {
      context.moveTo(0, y);
      context.lineTo(this.m_width, y);
    }
    context.stroke();
  },
  setupRep : function() {
    try {
      switch(this.m_chartType) {
        case "normal":
          var context = this.m_context;
          var spacing_y = (this.m_height-(25+40))/this.m_data.length;
          var spacing_x = (this.m_width-(40-34-50))/this.m_labels.length;
          var x=70, y=37;
          for(var i=0; i<this.m_data.length; i++) {
            context.beginPath();
            context.arc(x, this.m_height-40, 5, Math.PI*2, 0);
            var font = "15px Arial";
            text_color = this.m_color;
            this.m_style.hasOwnProperty("font") ? font = this.m_style.font : font = "15px Arial";
            this.m_style.hasOwnProperty("ytext_color") ? text_color = this.m_style.ytext_color : text_color = this.m_color;
            context.font = font;
            context.fillStyle = text_color;
            var spacingPerChar = this.m_labels[i].length;
            context.fillText(this.m_labels[i], x-(spacingPerChar*3), this.m_height-15);
            context.fill();
            this.m_labelsCords[this.m_labels[i]] = x;
            x += spacing_x;
          }
          for(var i=0; i<this.m_labels.length; i++) {
            context.beginPath();
            context.arc(40, y, 5, Math.PI*2, 0);
            var font = "15px Arial";
            text_color = this.m_color;
            this.m_style.hasOwnProperty("font") ? font = this.m_style.font : font = "15px Arial";
            this.m_style.hasOwnProperty("xtext_color") ? text_color = this.m_style.xtext_color : text_color = this.m_color;
            context.font = font;
            context.fillStyle = text_color;
            context.fillText(this.m_data[i], 7, y+5);
            context.fill();
            this.m_dataCords[this.m_data[i]] = y;
            y += spacing_y;
          }
          break;
        case "cartesian":
          var context = this.m_context;
          var spacing_y = (this.m_height-(25+40))/this.m_data.length;
          var spacing_x = (this.m_width-(280*2))/this.m_labels.length;
          var x=338, y=76;
          for(var i=0; i<this.m_data.length; i++) {
            context.beginPath();
            context.arc(x, this.m_height/2, 5, Math.PI*2, 0);
            var font = "15px Arial";
            text_color = this.m_color;
            this.m_style.hasOwnProperty("font") ? font = this.m_style.font : font = "15px Arial";
            this.m_style.hasOwnProperty("xtext_color") ? text_color = this.m_style.xtext_color : text_color = this.m_color;
            context.font = font;
            context.fillStyle = text_color;
            var spacingPerChar = this.m_labels[i].length;
            context.fillText(this.m_labels[i], x-(spacingPerChar*3), this.m_height/2+27);
            context.fill();
            this.m_labelsCords[this.m_labels[i]] = x;
            x += spacing_x;
          }
          for(var i=0; i<this.m_labels.length; i++) {
            context.beginPath();
            context.arc(this.m_width/2, y, 5, Math.PI*2, 0);
            var font = "15px Arial";
            text_color = this.m_color;
            this.m_style.hasOwnProperty("font") ? font = this.m_style.font : font = "15px Arial";
            this.m_style.hasOwnProperty("ytext_color") ? text_color = this.m_style.ytext_color : text_color = this.m_color;
            context.font = font;
            context.fillStyle = text_color;
            context.fillText(this.m_data[i], this.m_width/2+15, y+5);
            context.fill();
            this.m_dataCords[this.m_data[i]] = y;
            y += spacing_y;
          }
          break;
      }

    } catch(e) {
      console.log("Graf : A little bug is flying right there : "+e);
    }
  },
  draw : function(labels, data) {
    if((labels.length > 0 && data.length > 0) && (labels.length == data.length) && (labels.length < 22)) {
        this.drawTable();
        this.drawCanvas();
        this.m_labels = labels;
        this.m_data = data;
        this.setupRep();
    } else {
      console.log("Graf : Data length and labels length are not equal.");
    }
  },
  placePoint : function(cords, type) {
    try {
       type = type || "rep";
       var context = this.m_context;
       switch(type) {
         case "rep":
          for(var i=0; i<cords.length; i++) {
            var cordx = cords[i][0];
            var cordy = cords[i][1];
            var x = this.m_labelsCords[cordx],
                y = this.m_dataCords[cordy];
            context.beginPath();
            var radius = 5;
            var hover = false;
            this.m_style.hasOwnProperty("point_radius") ? radius = this.m_style.point_radius : radius = 5;
            this.m_style.hasOwnProperty("point_hover") ? hover = this.m_style.point_hover : hover = false;
            if(cords[i].length > 2) {
              var ball_fill = cords[i][2];
            } else {
              var ball_fill = "#000";
            }
            var hex=  ball_fill.replace("#", "");
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);
            var rgba = "rgba("+r+", "+g+", "+b+", 0.5)";
            if(cords[i].length > 2) {
              context.fillStyle = rgba;
              context.arc(x, y, radius+3, Math.PI*2, 0);
              context.fill();
            }
            context.beginPath();
            context.fillStyle = ball_fill;
            context.arc(x, y, radius, Math.PI*2, 0);
            context.fill();
          }
          if(this.m_graf_link) {
            context.beginPath();
            linker_color = this.m_color;
            linker_width = 0.3;
            this.m_style.hasOwnProperty("linker_color") ? linker_color = this.m_style.linker_color : linker_color = this.m_color;
            this.m_style.hasOwnProperty("linker_width") ? linker_width = this.m_style.linker_width : linker_width = 0.3;
            context.lineWidth = linker_width;
            context.strokeStyle = linker_color;
            var samplex = cords[0][0];
            var sampley = cords[0][1];
            var x = this.m_labelsCords[samplex],
                y = this.m_dataCords[sampley];
            context.moveTo(x, y);
            for(var i=1; i<cords.length; i++) {
              var samplex = cords[i][0];
              var sampley = cords[i][1];
              var x = this.m_labelsCords[samplex],
                  y = this.m_dataCords[sampley];
              context.lineTo(x,y);
            }
            context.stroke();
          }
          break;
        case "plane":
          var context = this.m_context;
          for(var i=0; i<cords.length; i++) {
            var x = cords[i][0],
                y = cords[i][1];
            x > this.m_width ? x = 40 : x = x;
            y > this.m_height ? y = this.m_height-40 : y = y;
            context.beginPath();
            var hover = false;
            this.m_style.hasOwnProperty("point_radius") ? radius = this.m_style.point_radius : radius = 5;
            this.m_style.hasOwnProperty("point_hover")  ? hover = this.m_style.point_hover : hover = false;
            if(cords[i].length > 2) {
              var ball_fill = cords[i][2];
            } else {
              var ball_fill = "#000";
            }
            var hex=  ball_fill.replace("#", "");
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);
            var rgba = "rgba("+r+", "+g+", "+b+", 0.5)";
            if(cords[i].length > 2) {
              context.fillStyle = rgba;
              context.arc(x, y, radius+3, Math.PI*2, 0);
              context.fill();
            }
            context.beginPath();
            context.fillStyle = ball_fill;
            context.arc(x, y, radius, Math.PI*2, 0);
            context.fill();
          }
          if(this.m_graf_link) {
            context.beginPath();
            linker_color = this.m_color;
            linker_width = 0.3;
            this.m_style.hasOwnProperty("linker_color") ? linker_color = this.m_style.linker_color : linker_color = this.m_color;
            this.m_style.hasOwnProperty("linker_width") ? linker_width = this.m_style.linker_width : linker_width = 0.3;
            context.lineWidth = linker_width;
            context.strokeStyle = linker_color;
            var x = cords[0][0],
                y = cords[0][1];
            x > this.m_width ? x = 40 : x = x;
            y > this.m_height ? y = this.m_height-40 : y = y;
            context.moveTo(x, y);
            for(var i=1; i<cords.length; i++) {
              var x = cords[i][0],
                  y = cords[i][1];
              x > this.m_width ? x = 40 : x = x;
              y > this.m_height ? y = this.m_height-40 : y = y;
              context.lineTo(x,y);
            }
            context.stroke();
          }
          break;
       }
    } catch(e) {
      console.log("Graf : A little bug is flying right there : "+e);
    }
  },
  cartesianStartPoint : function() {
    return [this.m_width/2, this.m_height/2];
  },
  /* Warning : Responsive is not fully working, if you want you can increase the performance of this function */
  responsive : function() {
    var responsive = false;
    var context = this.m_context;
    this.m_style.hasOwnProperty("responsive") ? responsive = this.m_style.responsive : responsive = false;
    if(responsive) {
      context.clearRect(0, 0, this.m_width, this.m_height);
      this.m_width = window.innerWidth;
      this.m_height = window.innerHeight;
      this.draw(this.m_labels, this.m_data);
    }
  },
  /* Some mathematic functions */
  graphEquation : function(equation, range, data, style) {
    var style = style || {line_width : 0.3, line_color : "#000"};
    var context = this.m_context;
    context.save();
    context.translate(this.m_width/2, this.m_height/2);
    context.moveTo(range[0], equation(range[0], data));
    for(var i=range[0]+data.iteration; i<=range[1]; i++) {
      context.lineTo(i, equation(i, data));
    }
    context.lineWidth = style.line_width;
    context.strokeStyle = style.line_color;
    context.stroke();
    context.restore();
  },
  quadratic : function(x, data) {
    var y = data.a*(x*x)+data.b*x+data.c;
    return y;
  },
  sins : function(x, data) {
    return data.offset*Math.sin(x);
  },
  coss : function(x, data) {
    return data.offset*Math.cos(x);
  },
  /* Bezier curves */
  Bezier : function(points) {
    var context = this.m_context;
    context.beginPath();
    for(var t=0; t<1; t += 0.1) {
      if(t == 0) {
        var x = (1-t)*points[0].x+t*points[1].x;
        var y = (1-t)*points[0].y+t*points[1].y;
        context.moveTo(x, y);
      } else {
        var x = (1-t)*points[0].x+t*points[1].x;
        var y = (1-t)*points[0].y+t*points[1].y;
        context.lineTo(x, y);
      }
    }
    context.stroke();
  },
  quadraticBezier : function(points) {
    var context = this.m_context;
    context.beginPath();
    for(var t=0; t<1; t+= 0.1) {
      if(t == 0) {
        var x = Math.pow((1-t), 2)*points[0].x+(2*t)*(1-t)*points[1].x+Math.pow(t, 2)*points[2].x;
        var y = Math.pow((1-t), 2)*points[1].y+(2*t)*(1-t)*points[1].y+Math.pow(t, 2)*points[2].y;
        context.moveTo(x, y);
      } else {
        var x = Math.pow((1-t), 2)*points[0].x+(2*t)*(1-t)*points[1].x+Math.pow(t, 2)*points[2].x;
        var y = Math.pow((1-t), 2)*points[1].y+(2*t)*(1-t)*points[1].y+Math.pow(t, 2)*points[2].y;
        context.lineTo(x, y);
      }
    }
    context.stroke();
  },
  cubicBezier : function(points) {
    var context = this.m_context;
    context.beginPath();
    for(var t=0; t<1; t+= 0.1) {
      if(t == 0) {
        var x = Math.pow((1-t), 3)*points[0].x+3*points[1].x*t*Math.pow((1-t), 2)+3*points[2].x*Math.pow(t, 2)*(1-t)+points[3].x*Math.pow(t, 3);
        var y = Math.pow((1-t), 3)*points[0].y+3*points[1].y*t*Math.pow((1-t), 2)+3*points[2].y*Math.pow(t, 2)*(1-t)+points[3].y*Math.pow(t, 3);
        context.moveTo(x, y);
      } else {
        var x = Math.pow((1-t), 3)*points[0].x+3*points[1].x*t*Math.pow((1-t), 2)+3*points[2].x*Math.pow(t, 2)*(1-t)+points[3].x*Math.pow(t, 3);
        var y = Math.pow((1-t), 3)*points[0].y+3*points[1].y*t*Math.pow((1-t), 2)+3*points[2].y*Math.pow(t, 2)*(1-t)+points[3].y*Math.pow(t, 3);
        context.lineTo(x, y);
      }
    }
    context.stroke();
  },
  /* Both cubic and bezier are corrupted, the other may work well */
  /* Now let's return to our usual script functions */
  context : function() {
    return this.m_context;
  },
  translate : function(x, y) {
    this.m_context.translate(x, y);
  },
  scale : function(x, y) {
    this.m_context.scale(x, y);
  },
  drawPointCords : function(x, y, style) {
    var color, radius;
    style = style || {};
    style.hasOwnProperty("radius") ? radius = style.radius : radius = 5;
    style.hasOwnProperty("color") ? color = style.color : color = this.m_color;
    this.m_context.beginPath();
    this.m_context.arc(x, y, radius, Math.PI*2, 0);
    this.m_context.fillStyle = color;
    this.m_context.fill();
  },
  drawPointRep : function(x, y, style) {
    var color, radius;
    var repCordx = this.m_labelsCords[x];
    var repCordy = this.m_dataCords[y];
    style = style || {};
    style.hasOwnProperty("radius") ? radius = style.radius : radius = 5;
    style.hasOwnProperty("color") ? color = style.color : color = this.m_color;
    this.m_context.beginPath();
    this.m_context.arc(repCordx, repCordy, radius, Math.PI*2, 0);
    this.m_context.fillStyle = color;
    this.m_context.fill();
  }
}
