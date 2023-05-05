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
interface TestCycle {
  name: string;
  testCycle?: TestCycle[];
}

interface TestCase {
  title: string;
  description: string;
  type: TestType;
}

enum TestType {
  Unit,
  Mutation,
  Manual,
  Integration,
  Load,
  Performance,
  Acceptance
}

const TREE_DATA: TestCycle[] = [
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
    testCycle: [
      {
        name: 'Test de infraestructura y HA para ECDY',
        testCycle: [
          { name: 'Test ingress' },
          { name: 'Chaos testing replicas' },
        ],
      },
      {
        name: 'Test de carga - Usuarios concurrentes en ECDY',
        testCycle: [
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
  private _transformer = (node: TestCycle, level: number) => {
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
