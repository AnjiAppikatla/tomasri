import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agentsSubject = new BehaviorSubject<any[]>([]);
  agents$ = this.agentsSubject.asObservable();

  addAgent(agent: any) {
    const currentAgents = this.agentsSubject.value;
    this.agentsSubject.next([agent, ...currentAgents]);
  }
}