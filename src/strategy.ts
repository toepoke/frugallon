import { ChangeDetectionStrategy } from "@angular/core";

// TODO: - Move to OnPush when we refactor to use NGRX fully
export const COMPONENT_STRATEGY: ChangeDetectionStrategy = ChangeDetectionStrategy.OnPush;
export const ORCHESTRATOR_STRATEGY: ChangeDetectionStrategy = ChangeDetectionStrategy.Default;


