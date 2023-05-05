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
  title: string;
  testCycle?: TestCycle[];
  testCases?: TestCase[];
}

interface TestStep {
  title: string;
  description: string;
  order: number;
}

enum TestType {
  Unit,
  Mutation,
  Manual,
  Integration,
  Load,
  Performance,
  Acceptance,
}

interface TestCase {
  title: string;
  description: string;
  testType: TestType;
  testSteps?: TestStep[];
}

const TREE_DATA: TestCycle[] = [
  {
    title: 'Test para el login ECDY',
    testCycle: [
      { title: 'Test de Usuario correcto' },
      { title: 'Test Olvidar contraseña' },
      { title: 'Test usuario incorrecto' },
    ],
  },
  {
    title: 'Test de performance de ECDY',
    testCycle: [
      {
        name: 'Test de infraestructura y HA para ECDY',
        testCycle: [
          { title: 'Test ingress' },
          { title: 'Chaos testing replicas' },
        ],
      },
      {
        title: 'Test de carga - Usuarios concurrentes en ECDY',
        testCycle: [
          { title: 'Test 500 Usuarios' },
          { title: 'Test Chrome, Firefox, Edge' },
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
