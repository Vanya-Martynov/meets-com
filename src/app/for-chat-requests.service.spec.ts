import { TestBed, inject } from '@angular/core/testing';

import { ForChatRequestsService } from './for-chat-requests.service';

describe('ForChatRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForChatRequestsService]
    });
  });

  it('should be created', inject([ForChatRequestsService], (service: ForChatRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
