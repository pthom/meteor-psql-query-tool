///<reference path="../../typings/webix/webix.d.ts" />
///<reference path="../../lib/HtmlElementIdProvider.ts" />

class HelpPopup {
    idProvider = new HtmlElementIdProvider();

    private windowElement() {
        var window = <webix.ui.window> $$(this.idProvider.Id("popup"));
        return window;
    }

    constructor(help:string, title?:string) {
        var popup = {
            view:"window",
            id: this.idProvider.Id("popup"),
            height:250, width:600,
            position: 'center',
            move:true,
            hidden:true,
            head:{
                view:"toolbar", margin:-4, cols:[
                    {view:"label", label: title ? title : "Help" },
                    {view:"icon", icon:"plus", click:() => {
                            var window_ = <any>this.windowElement();
                            window_.config.fullscreen = ! window_.config.fullscreen;
                            window_.resize();
                        }
                    },
                    { view:"icon", icon:"times-circle",
                        click: () => { this.windowElement().hide(); }}
                ]
            },
            body: help
        }
        webix.ui(popup);//.show();
    }

    HelpButton() : any {
        var helpButton = {
            view:"icon",
            //type:"iconButton",
            icon:"question-circle",
            maxWidth:20,
            id:this.idProvider.Id("helpBtn"),
            click: () => {
                var window = <any>$$(this.idProvider.Id("popup"));
                var btn = $$(this.idProvider.Id("helpBtn"));
                //window.show(btn, {pos: "bottom"});
                window.show();//true, true);
            }
        };
        return helpButton;
    }

}