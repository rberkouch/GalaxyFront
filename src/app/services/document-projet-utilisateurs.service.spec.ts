import { TestBed } from '@angular/core/testing';

import { DocumentProjetUtilisateursService } from './document-projet-utilisateurs.service';

describe('DocumentProjetUtilisateursService', () => {
  let service: DocumentProjetUtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentProjetUtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
