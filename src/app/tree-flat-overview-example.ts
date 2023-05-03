import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface MenuTestCycle {
  name: string;
  children?: MenuTestCycle[];
}

const TREE_DATA: MenuTestCycle[] = [
  {
    name: 'Test para el login ECDY',
    children: [
      { name: 'Test de Usuario correcto' },
      { name: 'Test Olvidar contraseña' },
      { name: 'Test usuario incorrecto' },
    ],
  },
  {
    name: 'Test de performance de ECDY',
    children: [
      {
        name: 'Test de infraestructura y HA para ECDY',
        children: [
          { name: 'Test ingress' },
          { name: 'Chaos testing replicas' },
        ],
      },
      {
        name: 'Test de carga - Usuarios concurrentes en ECDY',
        children: [
          { name: 'Test 500 Usuarios' },
          { name: 'Test Chrome, Firefox, Edge' },
        ],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
})
export class TreeFlatOverviewExample {
  private _transformer = (node: MenuTestCycle, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
