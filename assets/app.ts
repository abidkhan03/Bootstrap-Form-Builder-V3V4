define([
    "jquery",
    "underscore",
    "collections/snippets",
    "collections/my-form-snippets",
    "views/tab",
    "views/my-form",
    "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/button.json",
    "text!templates/app/render.html", "text!templates/app/about.html",

], function (
    $: any,
    _: any,
    SnippetsCollection: any,
    MyFormSnippetsCollection: any,
    TabView: any,
    MyFormView: any,
    inputJSON: any, radioJSON: any,
    selectJSON: any, buttonJSON: any,
    renderTab: any, aboutTab: any
): any {
    return {
        initialize: function () {
            new TabView({
                title: "Input",
                collection: new SnippetsCollection(JSON.parse(inputJSON)),
            });

            new TabView({
                title: "Radios / Checkboxes",
                collection: new SnippetsCollection(JSON.parse(radioJSON)),
            });

            new TabView({
                title: "Select",
                collection: new SnippetsCollection(JSON.parse(selectJSON)),
            });

            new TabView({
                title: "Buttons",
                collection: new SnippetsCollection(JSON.parse(buttonJSON)),
            });

            new TabView({
                title: "Rendered",
                content: renderTab
            });

            new TabView({
                title: "About",
                content: aboutTab
            });

            //Make the first tab active!
            $("#components .tab-pane").first().addClass("active");
            $("#formtabs li").first().addClass("active");

            var layout_number_of_columns = 1;

            let myform_view = new MyFormView({
                title: "Original",
                columns: layout_number_of_columns,
                collection: new MyFormSnippetsCollection([
                    {
                        "title": "Form Name",
                        "fields": {
                            "name": {
                                "label": "Form Name",
                                "type": "input",
                                "value": "Form Name"
                            }
                        }
                    }
                ])
            });

            //Deal with the layout column selector
            $('#form-layout li').on('click',  () => {

                var output_tpl = _.template("Form Layout: <%= number %> column(s)");
                $('#form-layout-text').val(output_tpl({ number: $(this).attr("value") }));
                layout_number_of_columns = $(this).attr("value");
                myform_view.setLayoutNumberOfColumns(layout_number_of_columns);
                myform_view.render()
            });


            $("#saveForm").click(function () {
                var data = {
                    layout_number_of_columns: layout_number_of_columns,
                    data: myform_view.collection.data,
                }
                let blob = new Blob([JSON.stringify(data)], { type: 'text/plain' }),
                    anchor = document.createElement('a');
                let formName = $.trim(data.data[0]['fields']['name']['value']).replace(/\s/g, "_");


                anchor.download = "form_layout_" + formName + ".txt";
                anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
                anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
                anchor.dispatchEvent(new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window }));
            });


            $("#loadForm").on('change', function (event: any) {
                if (typeof window.FileReader !== 'function')
                    throw ("The file API isn't supported on this browser.");
                let input = event.target;
                if (!input)
                    throw ("The browser does not properly implement the event object");
                if (!input.files)
                    throw ("This browser does not support the `files` property of the file input.");
                if (!input.files[0])
                    return undefined;
                let file = input.files[0];
                let fr = new FileReader();
                fr.onload = function (evt) {
                    if (evt.target && typeof evt.target.result === 'string') {
                        try {
                            let form_layout_json = JSON.parse(evt.target.result); // Safe to assume evt.target.result is a string here
                            // myform_view.collection = new MyFormSnippetsCollection([]);
                            myform_view.setLayoutNumberOfColumns(form_layout_json.layout_number_of_columns);
                            myform_view.collection = new MyFormSnippetsCollection(form_layout_json.data);
                            myform_view.bindCollectionEvents();
                            myform_view.render();

                            let output_tpl = _.template("Form Layout: <%= number %> column(s)");
                            $('#form-layout-text').val(output_tpl({ number: form_layout_json.layout_number_of_columns }));
                        } catch (error) {
                            alert("Parsing form layout file error:" + error)
                        }
                    } else {
                        throw "Failed to load file";
                    }
                };
                fr.readAsText(file);
            });

        }
    }
})

function define(
  dependencies: string[],
  callback: (
    $: JQueryStatic,
    _: _.UnderscoreStatic,
    SnippetsCollection: any,
    MyFormSnippetsCollection: any,
    TabView: any,
    MyFormView: any,
    inputJSON: any,
    radioJSON: any,
    selectJSON: any,
    buttonJSON: any,
    renderTab: any,
    aboutTab: any
  ) => void
) {
  // Implementation here
}

