'use strict';

/* Controleur de la home page */

angular.module('alveolus.graphCtrl', []).
controller('GraphCtrl', function($scope,$routeParams,$location,TagService,CategoryService,globals) {

  $scope.webappSelected = null;
  $scope.detailViewed = false ; 
  $scope.change = function(i,j){
    $scope.$apply(function(){
      $scope.webappSelected = $scope.categories[i].webapps[j];
    });
    console.log( $scope.webappSelected.title);
  }

  $scope.selection = "cat";

  $scope.explorationCat = function(){
    $scope.selection = "cat";
    CategoryService.getCategoriesWithAllWebapps(initGraph);
  }

  $scope.explorationTag = function(){
    $scope.selection = "tag";
    TagService.getTagsWithAllWebapps(initGraph);
  }


  $scope.explorationCat();

  function initGraph(data){
    $scope.categories = data ;
    var root = new Object();
    var index = 0 ;
    root.name = "root";
    root.children =new Array();
    for(var i=0; i<data.length;i++){
      root.children[i] = new Object();
      // root.children[i].name = data[i].name.toUpperCase() ;
      root.children[i].name = data[i].name
      root.children[i].index =  i ;
      if(data[i].description != null && data[i].description != undefined){
        root.children[i].description = data[i].description ;
      }
      root.children[i].children = new Array();
      index=0;
      for (var j = 0; j< data[i].webapps.length ; j++){
        if (data[i].webapps[j].validate == true) {
          console.log(data[i].name);
              root.children[i].children[index] = new Object();
              root.children[i].children[index].title = data[i].webapps[j].title ;
              root.children[i].children[index].index = j ;
              root.children[i].children[index].image = data[i].webapps[j].image_url;
              root.children[i].children[index].caption = data[i].webapps[j].caption ;
              root.children[i].children[index].description = data[i].webapps[j].description ;
              index++;
            }
          }
          for (var j = 0; j< root.children[i].children.length ; j++){
            root.children[i].children[j].size = 50 ;
          }
        }

        var positionPopover = function (d){
          var x,y,gravity;

          // if(d.x==0){
            // x = -300;
            // y = d.y+d.dy/2;
            // gravity = "right";
         //  }
         //  else{
           x = w;
           y = d.y+d.dy/2;
           gravity = "right";
         // }
         return {
          x : x,
          y : y,
          gravity : gravity
        }
      }


      var w = 760/1,
      h = 800/1.2,
      x = d3.scale.linear().range([0, w]),
      y = d3.scale.linear().range([0, h]),
      color = d3.scale.category20c(),
      root,
      node;

      var treemap = d3.layout.treemap()
      .round(false)
      .size([w, h])
      .sticky(true)
      .value(function(d) { return d.size; });

      if($("#graph").html()!=""){
        $("#graph").empty();
        $("#graph").hide();   
        $("#graph").fadeIn('slow',function(){

      })
     
      }
      
      var svg = d3.select("#graph").append("div")
      .attr("class", "chart")
      .style("width", w + "px")
      .style("height", h + "px")
      .append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(.5,.5)");

      node = root ;

      var nodes = treemap.nodes(root)
      .filter(function(d) { return (d.children && d.parent); });

      var g = svg.selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "cat")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", function(d) {console.log(d); return zoom(d.children ? d : root); });

      var rect = g.append("rect")
      .attr("width", function(d) {return d.dx -5})
      .attr("height",function(d) {return d.dy-5})
      .attr("rx",5)
      .attr("ry",5)
      .attr("fill", function(d) {return color(d.name)})
      .style("opacity","0.6")

      if($scope.selection=="cat"){
      
        rect.tooltip(function(d, i) {
          var r, svg;
          r = +d3.select(this).attr('r');
          svg = d3.select(document.createElement("svg")).attr("height", 10);
          var pop = svg.append("g");
          
          pop.append("div").html(d.description).attr("dy", "25");
          return {
            type: "popover",
            title: d.name,
            content: svg,
            detection: "shape",
            placement: "fixed",
            gravity: positionPopover(d).gravity,
            position: [positionPopover(d).x, positionPopover(d).y],
            displacement: [r + 2, -72],
            mousemove: false
          };
        });
      }
      g.append("text")
      .attr("x", function(d) {  return d.dx / 2; })
      .attr("y", function(d) { return d.dy / 2; })
      .attr("font-family","Politica")
      .attr("dy", ".35em")
      .attr("font-size",function(d){ if (d.dx >110) return "25px"
                                      else return "15px"})
      .attr("text-anchor", "middle")
      .text(function(d) {return d.name.substring(0,16); })


      d3.select(window).on("click", function() { zoom(root); });

      function zoom(d) {
        var kx = w / d.dx, ky = h / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        var t = svg.selectAll("g.cat").transition()
        .duration(d3.event.altKey ? 7500 : 600)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        if(d.depth==1){
          $scope.$apply(function(){
            $scope.detailViewed = true ;
          });
          t.select("rect")
          .attr("width", function(d) {  return kx * d.dx - 1; })
          .attr("height", function(d) { return ky * d.dy - 1; })
          .attr("fill","white")
          .each("end", function(){
            d3.select(this).attr("width",0);
            d3.select(this).attr("height",0);

          })

          t.select("text")
          .attr("fill","white")
          var cell = g.selectAll(".cell")
          .data(function(d){ return d.children || [d]; })  
          .enter().append("g")
          .attr("class", "cell")
          .on("click", function(d) { return zoom(root); });

          cell.append("image")
          .attr("x", function(d) { return x(d.x); })
          .attr("y", function(d) { return y(d.y); })
          .attr("width", function(d){return kx * d.dx - 10;})
          .attr("xlink:href", function(d){return d.image})
          .attr("height", function(d){return ky * d.dy - 10; })
          .on("mouseover",function(d){
            $scope.change(d.parent.index,d.index)
          })

        }
        else{
          $scope.$apply(function(){
            $scope.detailViewed = false ;
          });

          t.select("text")
          .attr("fill","black")

          t.select("rect")
          .attr("rx",5)
          .attr("ry",5)
          .attr("width", function(d) {return d.dx -5})
          .attr("height",function(d) {return d.dy-5})
          .attr("fill",function(d){return color(d.name)})

          var q = svg.selectAll(".cell image").transition()
          .duration(300)
          
          
          q.style('opacity', 0.1)
          .each("end",function(){this.parentNode.remove();})

        }
        node = d;
        d3.event.stopPropagation();
      }
    }



});