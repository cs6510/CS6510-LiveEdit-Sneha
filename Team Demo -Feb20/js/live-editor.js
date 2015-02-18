// live editor
// this live editor implementation is for inter window/tab communication
// it has to be used with the appropriate implementation of live-editor-client.js
//
// implementation depends on postMessage
var liveEditor = (function(){
  //object reference to live editor client listener function
  liveEditorClientListener = null;
  //object reference to live editor sender function
  liveEditorSender = null;

    executor = function (event) {
        console.log(event.data + " via live editor executor");
        var data = JSON.parse(event.data);
        console.log(data + " via live editor executor");
               
        //var data = $.parseJSON(event.data);
        //console.log(data);

      //  console.log(JSON.parse('{ element: "checkbox", elementid: "checkbox1", property: "checked", updatedata: "true" }').element);
  //console.log(JSON.parse('{ "element": "checkbox", "elementid": "checkbox1", "property": "checked", "updatedata": "true" }').element);
       // var data = JSON.stringify(jsonObj, null, '\t');

       // $("pre").text(jsonPretty);
         //   $.getJSON(event.data, function (data) {
                //data is the JSON0string
                //console.log(data);
               // if (data == null) {
               //     console.log("no changes found");
               // }
              //  else {
                    var element = data.element;
                    var elementid = "#".concat(data.elementid);
                    var property = data.property;
                    var updatedata = data.updatedata;
               //     var id = data._id;
                    console.log(element);
                    console.log(elementid);
                    console.log(property);
                    if (element == "button") {
                        if (property == "text") {

                            $(elementid).text(updatedata);
                        }
                        else if (property == "reload") {
                            location.reload();
                        }
                        else {
                            $(elementid).css(property, updatedata);
                        }
                    } else if (element == "checkbox") {
                        if (property == "checked") {
                            alert("came here");
                            $(elementid).prop(property, updatedata);
                        }
                        else if (property == "labeltext") {

                            $(elementid + "+ label").html(updatedata);

                        } else if (property == "visible") {
								if (updatedata == "false") {
                                    $(elementid).hide();
                                    $(elementid + "+ label").hide();
                                }
                                else {
                                    $(elementid).show();
                                    $(elementid + "+ label").show();
                                }
                        }
                        else {//(property != "labeltext" && property != "checked") {
                            $(elementid + "+ label").css(property, updatedata);
                        }

                    }
                    else if (element == "label") {

                        if (property == "text") {

                            $(elementid).html(updatedata);

                        } else if (property == "visible") {
                            if (updatedata == "false")
                                $(elementid).hide();
                            else
                                $(elementid).show();
                        }
                        else {//(property != "labeltext" && property != "checked") {
                            $(elementid).css(property, updatedata);
                        }

                    }
                    else if (element == "text") {

                        if (property == "text") {

                            $(elementid).val(updatedata);

                        }
                        else if (property == "number") {
                            if (updatedata == "true") {
                                $(elementid).keypress(function (evt) {
                                    evt = (evt) ? evt : window.event;
                                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                        return false;
                                    }
                                    return true;

                                });
                            } else {
                                $(elementid).keypress(function () {

                                });

                            }
                        } else if (property == "visible") {
                            if (updatedata == "false")
                                $(elementid).hide();
                            else
                                $(elementid).show();
                        }
                        else {
                            $(elementid).css(property, updatedata);
                        }
                    } else if (element == "password") {

                        $(elementid).css(property, updatedata);
                    }
                    else if (element == "image") {

                        if (property == "url") {
                            $(elementid).attr('src', updatedata);

                        } else if (property == "visible") {
                            if (updatedata == "false")
                                $(elementid).hide();
                            else
                                $(elementid).show();
                        }
                        else {
                            $(elementid).css(property, updatedata);
                        }
                    }
        
              //  }

        
        liveEditorClientListener(event);
        liveEditorSender(event);
    }

  addClientListener = function(listener){
    liveEditorClientListener = listener;
    window.addEventListener("message", executor, false);
  }

  addSender = function(sender){
    liveEditorSender = sender;
  }

  return self;
})();
