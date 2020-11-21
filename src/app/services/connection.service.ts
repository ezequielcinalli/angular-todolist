import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  private taskDoc: AngularFirestoreDocument<Task>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = afs.collection<Task>('tasks');
    // this.tasks = this.tasksCollection.valueChanges();
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getTasks() {
    return this.tasks;
  }

  add(task: Task) {
    this.tasksCollection.add(task);
  }

  update(task: Task) {
    this.taskDoc = this.afs.doc<Task>(`tasks/${task.id}`);
    this.taskDoc.update(task);
  }

  remove(task:Task){
    this.taskDoc = this.afs.doc<Task>(`tasks/${task.id}`);
    this.taskDoc.delete();
  }
}
