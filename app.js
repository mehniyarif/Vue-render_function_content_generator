const app = Vue.createApp({})
app.component('generator',{
    data(){
        return{
            deneme:null,
            firstData:[
                {
                    content:"",
                    tag:"p"
                    }
            ],
            generateData:null,
            selectableTextArea:null,
            selectionToolboxVisible:false,
            selectionElement:null
        }
    },
    methods:{
        changeHtmlStyle(st){
            let selectedText = window.getSelection().toString().trim();
            this.selectionElement.value = this.selectionElement.value.replace(selectedText,`<${st}>${selectedText}</${st}>`)
            this.selectionElement.dispatchEvent(new Event('input'))
            this.selectionToolboxVisible = false
            window.getSelection().empty();
        },
       
        selectableTextAreaMouseUp(e) {
            this.selectionElement = e.target
            let selectionToolbox = document.getElementById('selection-toolbox')
            selectionToolbox.style.left = e.clientX - 70 +"px"
            selectionToolbox.style.top = e.clientY - 60 +"px"
            
            setTimeout(() => { 
                let selectedText = window.getSelection().toString().trim();
                if(selectedText){
                    this.selectionToolboxVisible = true
                }
            }, 100);
        },
        closeToolbox(){
            this.selectionToolboxVisible = false
        },
        attrGenerate(attrs){
            let result ="\n"
            if(attrs && attrs.length){
               result = "{"
                attrs.map((item,key) => {
                    result += `${item.attr}:"${item.value}"${attrs.length == key+1 ? "": ","} `
                })  
                result += "},\n"
            }      
            return result
        },
        linesGenerate(data){
            let result = ""
            if(data && data.length){
                data.map((item,key) => {
                    if(data.length == key+1){
                        result += this.lineGenerate(item,true)
                    }else{
                        result += this.lineGenerate(item,false)
                    }
                })
            }
            return result
        },
        lineGenerate(item,last=false){
            let result = ""
            if(item  && (item.content || item.children)){
                    if(item.children && item.children.length){
                        result += `h("${item.tag}", ${this.attrGenerate(item.attrs)} [${item.children && item.children.length > 1 ? "\n" : ""}${this.linesGenerate(item.children)}])${last ? " ": ", \n"} `
                    }else{
                        if(item.tag){
                            result += `h("${item.tag}", ${this.attrGenerate(item.attrs)} ["${item.content} "])${last ? " ": ", \n"} `
                        }else{
                            result += `"${item.content}${last ? " ": ", \n"} "`
                        }
                    }
            }
            return result
        },
        generatingData(){
            let result = ""
            if(this.firstData && this.firstData.length){
                this.firstData.map((item,key) => {
                    if(this.firstData.length == key+1){
                        result += this.lineGenerate(item,true)
                    }else{
                        result += this.lineGenerate(item,false)
                    }
                })
            }
            this.generateData = result
        },
        copyData(){            
            navigator.clipboard.writeText(this.generateData).then(function() {
                console.log("Başarıyla Kopyalandı")
            }, function() {
                console.log("Kopyalama Başarısız Oldu.")
            });
        },
        updateData(key,event){
            this.firstData[key] = event 
        },
        addRow(){
            this.firstData.push(
                {
                    content:"",
                    tag:"p",
                })
       
        },
        deleteData(key){
            this.firstData.splice(key,1)
        },
        addChild(key){
            if(this.firstData[key].children && this.firstData[key].children.length){
                this.firstData[key].children.push(
                {
                    content:"",
                    tag:"p",
                })
            }else{
                this.firstData[key].children = [
                        {
                        content:"",
                        tag:"p",
                    }
                ]
            }
            
        },
        
        updateDataStep2(key,step2Key,event){
            this.firstData[key].children[step2Key] = event 
        },
        deleteDataStep2(key,step2Key){            
            if(this.firstData[key].children && this.firstData[key].children.length){
                     this.firstData[key].children.splice(step2Key,1)
            }
        },
        addChildStep2(key,step2Key){
            if(this.firstData[key].children[step2Key].children && this.firstData[key].children[step2Key].children.length){
                this.firstData[key].children[step2Key].children.push(
                {
                    content:"",
                    tag:"p",
                })
            }else{
                this.firstData[key].children[step2Key].children = [
                        {
                        content:"",
                        tag:"p",
                    }
                ]
            }

            
        },

        updateDataStep3(key,step2Key,step3Key,event){
            this.firstData[key].children[step2Key].children[step3Key] = event 
        },
        deleteDataStep3(key,step2Key,step3Key){            
            if(this.firstData[key].children[step2Key].children && this.firstData[key].children[step2Key].children.length){
                     this.firstData[key].children[step2Key].children.splice(step3Key,1)
            }
        },
        addChildStep3(key,step2Key,step3Key){
            if(this.firstData[key].children[step2Key].children[step3Key].children && this.firstData[key].children[step2Key].children[step3Key].children.length){
                this.firstData[key].children[step2Key].children[step3Key].children.push(
                {
                    content:"",
                    tag:"p",
                })
            }else{
                this.firstData[key].children[step2Key].children[step3Key].children = [
                        {
                        content:"",
                        tag:"p",
                    }
                ]
            }

        },

        updateDataStep4(key,step2Key,step3Key,step4Key,event){
            this.firstData[key].children[step2Key].children[step3Key].children[step4Key] = event 
        },
        deleteDataStep4(key,step2Key,step3Key,step4Key){            
            if(this.firstData[key].children[step2Key].children[step4Key].children && this.firstData[key].children[step2Key].children[step4Key].children.length){
                     this.firstData[key].children[step2Key].children[step3Key].children.splice(step4Key,1)
            }
        },
        addChildStep4(key,step2Key,step3Key,step4Key){
            if(this.firstData[key].children[step2Key].children[step3Key].children[step4Key].children && this.firstData[key].children[step2Key].children[step3Key].children[step4Key].children.length){
                this.firstData[key].children[step2Key].children[step3Key].children[step4Key].children.push(
                {
                    content:"",
                    tag:"p",
                })
            }else{
                this.firstData[key].children[step2Key].children[step3Key].children[step4Key].children = [
                        {
                        content:"",
                        tag:"p",
                    }
                ]
            }

            
        },
    },
    template:`
    
    <div class="row mx-3 justify-content-start">
    <generator-form-row :step="1" color="secondary" v-for="(value,key) in firstData" :key="key" :idKey="'step1'+key" :data="firstData[key]" @addchild="addChild(key)" @delete="deleteData(key)" @update="updateData(key,$event)">
          <template v-slot:inside-row v-if="value.children && value.children.length">
              <generator-form-row :step="2" class="ml-3" color="info" v-for="(step2Value,step2Key) in value.children" :key="step2Key" :idKey="'step2'+step2Key" :data="firstData[key].children[step2Key]" @addchild="addChildStep2(key,step2Key)" @delete="deleteDataStep2(key,step2Key)" @update="updateDataStep2(key,step2Key,$event)">
                      <template v-slot:inside-row v-if="step2Value.children && step2Value.children.length">
                          <generator-form-row :step="3"  class="ml-3" color="light" v-for="(step3Value,step3Key) in step2Value.children" :key="step3Key" :idKey="'step3'+step3Key" :data="firstData[key].children[step2Key].children[step3Key]" @addchild="addChildStep3(key,step2Key,step3Key)" @delete="deleteDataStep3(key,step2Key,step3Key)" @update="updateDataStep3(key,step2Key,step3Key,$event)">
                              <template v-slot:inside-row v-if="step3Value.children && step3Value.children.length">
                                  <generator-form-row :step="4" :addChildStatus="false" class="ml-3" color="warning" v-for="(step4Value,step4Key) in step3Value.children" :key="step4Key" :idKey="'step4'+step4Key" :data="firstData[key].children[step2Key].children[step3Key].children[step4Key]" @addchild="addChildStep4(key,step2Key,step3Key,step4Key)" @delete="deleteDataStep4(key,step2Key,step3Key,step4Key)" @update="updateDataStep4(key,step2Key,step3Key,step4Key,$event)">
                                  </generator-form-row>
                              </template>
                          </generator-form-row>
                      </template>
               </generator-form-row>
          </template>
    </generator-form-row>
    <button class="btn btn-success mt-2 col-1" @click="addRow">Satır Ekle</button>
</div>
<div class="row card mx-3 bg-light mt-2" >
    <div class="card-header d-flex justify-content-between">
        <span>Çözümlenen Data</span> <button class="btn btn-sm btn-secondary" @click="copyData">Kopyala</button> <button class="btn btn-sm btn-primary" @click="generatingData">Çözümle</button>
    </div>
    <div class="card-body row">
        <div class="col-6"><pre>{{JSON.stringify(firstData,undefined,2)}}</pre></div>
        <div class="col-6"><template v-if="generateData ">
              <template v-for="(line, key) in generateData.split(\`\n\`)" :key="key"> {{line}}<br> 

              </template>
          </template> </div>
    </div>
    
  <div class="btn-group" v-click-outside="closeToolbox" role="group" v-show="selectionToolboxVisible" style="position:fixed; width:200px;" id="selection-toolbox" aria-label="Toolbox">
      <button type="button" @click="changeHtmlStyle('b')" class="btn btn-light"><b>B</b></button>
      <button type="button" @click="changeHtmlStyle('i')" class="btn btn-light"><i>I</i> </button>
      <button type="button" @click="changeHtmlStyle('a')" class="btn btn-light"><a href="#">link</a> </button>
      <button type="button" @click="changeHtmlStyle('q')" class="btn btn-light">""</button>
      <button type="button" @click="changeHtmlStyle('s')" class="btn btn-light"><s>Çiz</s></button>
      <button type="button" @click="changeHtmlStyle('sub')" class="btn btn-light"><sub>sub</sub></button>
      <button type="button" @click="changeHtmlStyle('sup')" class="btn btn-light"><sup>sup</sup></button>
      <button type="button" @click="changeHtmlStyle('mark')" class="btn btn-light"><mark>mark</mark></button>
      <button type="button" @click="changeHtmlStyle('u')" class="btn btn-light"><u>u</u></button>
  </div>
</div>`
  })



  app.component('generator-form-row', {
  
    props:{
        idKey:[String,Number],
        data:Object,
        color:String,
        step:Number,
        addChildStatus:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            tags:["","b","p","span","ol","ul",'li',"h1","h2","h3","h4","h5","h6","a","small","i","q","sub","sup","s","mark","u"],
            disableTags:["ol","ul"],
            attributeNames:["id","href","type","class","disabled","for","title","start"],
            styleTags:["b","i","a","q","sub","sup","s","mark","u"],
            formData:this.data,
            attrs:[],
            inputId:null,
            radioId:null,
            modalRadioId:null,
            modalKey:0
        }
    },
    created(){
        this.inputId = this.makeId(12)
        this.radioId = this.makeId(15)
        this.modalRadioId = this.makeId(9)
    },
    unmounted(){
       this.removeMouseupListener()
    },
    mounted(){
        setTimeout(() => {
            let inp = document.getElementById(this.inputId)
            if(inp){
                inp.dispatchEvent(new Event('input'))
            }
            
        }, this.step*100);
        this.removeMouseupListener()
            setTimeout(() => {
                this.addMouseupListener()
            }, 200);

        
        
    },
    methods:{
        mixin_autoResize_resize(event) {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        },
        makeId(length) {
            var result           = ["id"];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() * 
                charactersLength)));
            }
            result = result.join('');
            return result.toLowerCase()
        },
        changeData(event){
            this.mixin_autoResize_resize(event)
            let newValue = event.target.value
            let element = document.createElement("div")
            element.innerHTML = newValue            
            this.formData.children && delete this.formData.children
            this.createChildrens(element)

            this.$emit('update',this.formData)
        },
        childControl(cNodes){
            let cnt = 0
            if(cNodes && cNodes.length){
                cNodes.forEach((node)=>{
                    if(node.nodeName != "#text"){
                        cnt +=1
                    }
                })
            }
            return cnt > 0 ? true : false
        },
        createChildrens(newValue){
            let nodes = []
                newValue.childNodes.forEach((element) => {
                    let tag = element.nodeName == "#text" ? "" : element.nodeName.toLowerCase()
                    let content
                    if(element.nodeName == "#text"){
                        content = element.textContent
                    }else{
                        let len = element.outerHTML.length - ((tag.length * 2) + 5)
                        content = element.outerHTML.substr(tag.length+2,len)
                    }
                    nodes.push({
                        tag,
                        content
                    })
                });
            
            
            if(this.childControl(newValue.childNodes)){
                this.appendFormData(nodes)
            }
        },
         addMouseupListener(){
             this.selectableTextArea= document.querySelectorAll(".selectable-text-area");
            if(this.selectableTextArea){
                this.selectableTextArea.forEach(elem => {
                        elem.addEventListener("mouseup", this.$parent.selectableTextAreaMouseUp);
                        });
            }
        },
        removeMouseupListener(){
             this.selectableTextArea= document.querySelectorAll(".selectable-text-area");
                if(this.selectableTextArea){
                    this.selectableTextArea.forEach(elem => {
                            elem.removeEventListener("mouseup", this.$parent.selectableTextAreaMouseUp);
                            });
                }
        },
        appendFormData(data){
            setTimeout(() => {
              this.formData['children']=data
            }, 0);
        },
        addAttr(){
            this.attrs.push({attr:"id",value:""})
        },
        deleteAttr(key){
            this.attrs.splice(key,1)
        },
        openAttr(){
            if(this.formData.attrs && this.formData.attrs.length){
                this.attrs = new Array(...this.formData.attrs)
            }
            
            if(!this.attrs || !this.attrs.length){
                this.addAttr()
            }
        },
        saveAttr(){
            if(this.attrs && this.attrs.length){
                this.formData['attrs'] = new Array(...this.attrs)
                this.$emit('update',this.formData)
            }else{
                delete this.formData['attrs']
            }
        },
    },
  template: `
  
  <div class="card p-2" :class="'bg-'+color">
    <div class="row mb-3  justify-content-start" >
            <div class="col-12 mb-3">
                <div class="form-check-inline" v-for="(value,ind) in tags" :key="ind">
                    <input type="radio" class="btn-check" :value="value"  v-model="formData.tag"  :id="radioId+ind" autocomplete="off" >
                    <label class="btn btn-outline-dark" :for="radioId+ind">{{value}}</label>
                </div>
            </div>
            <div class="col-6 d-block">
                <textarea v-show="!disableTags.includes(formData.tag)" @input="changeData" v-model="formData.content" rows="1" class="form-control selectable-text-area" :id="inputId"></textarea>
                <label class="d-flex mt-2 text-dark p-1" v-html="formData.content"></label>
            </div>
            
            <div class="col-auto mx-2 d-block">
                <button class="row btn btn-danger" @click="$emit('delete')">Sil</button>
            </div>
            <div class="col-auto mx-2 d-block" >
                <button class="row btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal'+idKey" @click="openAttr" >Özellikler</button>
            </div>
            <div class="col-auto mx-2 d-block" v-if="addChildStatus">
                <button class="row btn btn-warning" @click="$emit('addchild')">İçe Ekle</button>
            </div>
    </div>
    <div class="row mx-3 mb-2" v-if="formData.attrs && formData.attrs.length">
            <button class="btn btn-sm col-auto btn-dark mx-1"  data-bs-toggle="tooltip" data-bs-placement="bottom" :title="value.value" v-for="(value,key) in formData.attrs" :key="key">{{value.attr}}</button>
    </div>
    <slot name="inside-row"></slot>
    <div class="modal fade" :key="modalKey" :id="'exampleModal'+idKey" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Özellikler</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-5 d-block">
          
      <button class="btn btn-success mb-4 col-2" @click="addAttr">Özellik Ekle</button>
          <template v-for="(attr,index) in attrs" :key="index">
            <div class="row bg-light mt-4" v-if="attr">
                
                <div class="col-12 mb-3">
                    <div class="form-check-inline" v-for="(value,ind) in attributeNames" :key="ind">
                        <input type="radio" class="btn-check"  :value="value" v-model="attr.attr"   :id="modalRadioId+ind" autocomplete="off" >
                        <label class="btn btn-outline-primary" :for="modalRadioId+ind">{{value}}</label>
                    </div>
                </div>
                <div class="col-auto mx-2 d-block">
                    <button class="row btn btn-danger" @click="deleteAttr(index)" >Sil</button>
                </div>
                <div class="col-10">
                    <input type="text" @input="changeData" v-model="attr.value" class="form-control" :id="'modal-input'+idKey">
                </div>
            </div>
          </template>
          

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="saveAttr" data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>


  </div>`
   
})

app.directive("click-outside", {
    beforeMount: function(el, binding) {
        const ourClickEventHandler = (event) => {
            if (!el.contains(event.target) && el !== event.target) {
                binding.value(event);
            }
        };
        el.__vueClickEventHandler__ = ourClickEventHandler;

        document.addEventListener("click", ourClickEventHandler);
    },
    unmounted: function(el) {
        document.removeEventListener("click", el.__vueClickEventHandler__);
    },
    })

    app.mount('#app')