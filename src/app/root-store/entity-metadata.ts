import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  requests: {
    entityName: 'beneficiary',
    selectId: (item) => item._id,
  },
  volunteer: {
    entityName: 'volunteer',
    selectId: (item) => item._id,
  },
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
