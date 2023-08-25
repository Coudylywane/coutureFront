import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categorie } from 'src/app/secure/shared/interfaces/parametrages';
import { CategorieService } from '../../../shared/services/categorie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {

  isEditMode = false;
  categories = [] as Categorie[];
  subscription = [] as Subscription[];
  categorieForm: FormGroup;
  selectedCategorie: Categorie | null = null; // Créez une variable pour stocker l'élément sélectionné
  selectedCategorieUnites: any[] = [];

  constructor(private categorieService: CategorieService, private fb: FormBuilder) {
    this.categorieForm = this.fb.group({
      libelle: ['', Validators.required],
      unite: ['', Validators.required] // Ajoutez ceci
    });
  }

  itemsPerPage = 2;
  totalItems = 0;
  currentPage = 1;
  totalPages = 1;


  ngOnInit(): void {

    this.findAllCategories(this.currentPage, this.itemsPerPage);
  }

  findAllCategories(page: number, itemsPerPage: number) {
    this.subscription.push(
      this.categorieService.all(page, itemsPerPage).subscribe(
        (data: any) => {
          this.categories = data.data; // Remplacez ceci par les données correctes de votre API
          this.totalPages = data.last_page;
          this.currentPage = data.current_page;
          // ... Autres opérations nécessaires
        }
      )
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.findAllCategories(this.currentPage, this.itemsPerPage);
    }
  }

  getPagesArray(total: number): number[] {
    const pagesArray: number[] = [];
    for (let i = 1; i <= total; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  changePage(page: number) {
    this.selectedCategoryIds = []; // Réinitialisez les sélections
    this.currentPage = page;
    this.findAllCategories(page, this.itemsPerPage);
  }
  

  addCategorie() {
    const libelle = this.categorieForm.get('libelle')?.value;
    const unite = this.categorieForm.get('unite')?.value;

    if (libelle) {
      const newCategorie = {
        libelle: libelle,
        unites: [
          { libelle: unite }
        ] 
        // Vous pouvez ajuster le libelle de l'unité ici
      };
      this.categorieService.create(newCategorie).subscribe(
        (response: any) => {
          console.log(response);
          this.categorieForm.reset();
          this.findAllCategories(this.currentPage, this.itemsPerPage);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
  cocher : boolean = false ;
  editCategorie(categorie: Categorie) {
    this.selectedCategorie = categorie;
    this.categorieForm.patchValue({
      libelle: categorie.libelle,
      // Remplissez d'autres champs si nécessaire
    });
    if (categorie.id !== undefined) {
      this.categorieService.getUnitesForCategorie(categorie.id).subscribe(
        (unites: any) => {
          console.log(unites);
          // Faites quelque chose avec les données d'unités récupérées
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  selectedCategoryIds: number[] = [];
  toggleCategorySelection(categoryId: number) {
    if (this.isSelected(categoryId)) {
      // Désélectionnez la catégorie
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    } else {
      // Sélectionnez la catégorie
      this.selectedCategoryIds.push(categoryId);
    }
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategoryIds.includes(categoryId);
  }

  isAllCategoriesSelected = false;

  toggleAllCategoriesSelection(event: any) {
    this.isAllCategoriesSelected = event.target.checked;

    if (this.isAllCategoriesSelected) {
      this.selectedCategoryIds = this.categories
        .filter(category => category.id !== undefined)
        .map(category => category.id!);
    } else {
      this.selectedCategoryIds = [];
    }
  }
  

  deleteSelectedCategories() {
    if (this.selectedCategoryIds.length === 0) {
      return; // Aucune catégorie sélectionnée
    }
    
    if (confirm("Êtes-vous sûr de vouloir supprimer les catégories sélectionnées ?")) {
      for (const categoryId of this.selectedCategoryIds) {
        this.categorieService.remove(categoryId).subscribe(
          (response) => {
            this.ngOnInit();
          },
          (error) => {
            console.error(error);
          }
        );
      }
      // Réinitialisez le tableau des catégories sélectionnées après la suppression
      this.selectedCategoryIds = [];
    }
  }


  
  
  


  


}
