import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import toastr from "toastr";
import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

//classe genérica para criação de formulários
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit,AfterContentChecked {

  //atributos gerais de formulario
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  
  constructor(protected injector: Injector,
              public resource: T,
              protected resourceService: BaseResourceService<T>,
              protected jsonDataToResourceFn: (jsonData) => T
              )
   {
      //obtem os dados do formulario chamador via injector
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
   }

  //metodo invocado na abertura da tela
  ngOnInit() {
    //verifica a acao atual no form
    this.setCurrentAction();
    //cria o formulario
    this.buildResourceForm();
    //carrega o time caso seja edição
    this.loadResource();
  }

  //metodo invocato apos a criacao dos componentes
  ngAfterContentChecked(){
    //atribui o titulo da pagina de forma dinamica
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "novo"){
      this.createResource();
    }else{
      this.updateResource();
    }
  }

  // METODOS PROTEGIDOS =============================================================

  protected setCurrentAction(){
    if(this.route.snapshot.url[0].path == "novo"){
      this.currentAction = "novo";
    }else{
      this.currentAction = "editar";
    }
  }

  protected loadResource(){
    if(this.currentAction == "editar"){

      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm .patchValue(resource); // faz o bind de resource para o formulario.
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  protected setPageTitle(){
    if(this.currentAction == "novo"){
      this.pageTitle = this.creationPageTitle();
    }else{
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return "Novo"
  }

  protected editionPageTitle(): string {
    return "Edição";
  }

  protected createResource(){

    const resource: T =  this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected updateResource(){

    const resource: T =  this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected actionsForSuccess(resource: T){
    //exibe uma mensagem na tela
    toastr.success("Solicitação processada com sucesso!");
    //obtem o path base de navegação
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path; 
    //redireciona para a pagina de edicao
    this.router.navigateByUrl(baseComponentPath,{skipLocationChange:true}).then(
      () => this.router.navigate([baseComponentPath,resource.id,"editar"])
    )
  }

  protected actionsForError(error){

    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
  }

  protected abstract buildResourceForm(): void;
}
