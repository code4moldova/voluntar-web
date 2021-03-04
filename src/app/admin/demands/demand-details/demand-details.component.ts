import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DemandsFacade } from '../demands.facade';
import { BeneficiariesService } from '@beneficiaries/beneficiaries.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Beneficiary } from '@beneficiaries/shared/beneficiary';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, from, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  switchMap,
} from 'rxjs/operators';
import { Demand } from '@demands/shared/demand';
import { BeneficiariesFacade } from '@app/admin/beneficiaries/beneficiaries.facade';
import { demandTypes } from '@demands/shared/demand-type';
import { zones } from '@shared/zone';
import { specialConditions } from '@beneficiaries/shared/special-condition';
import { generateSecret } from '@demands/shared/generate-secret';
import { DemandStatus } from '@demands/shared/demand-status';
import { isRecord } from '@shared/is-record';
import { TranslateService } from '@ngx-translate/core';
import { EsriMapComponent } from '@shared/esri-map/esri-map.component';

@Component({
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  DemandStatus = DemandStatus;
  zones = zones;
  demandTypes = demandTypes;
  specialConditions = specialConditions;

  foundBeneficiariesIsOpen = false;
  foundBeneficiaries: Beneficiary[] = [];
  selectedBeneficiary: Beneficiary | null = this.demand?.beneficiary ?? null;

  form = this.fb.group({
    beneficiary: !this.demand
      ? this.fb.group({
          phone: this.fb.control(null, [
            Validators.required,
            Validators.pattern(/^[^0]([0-9]){7}$/),
          ]),
          landline: this.fb.control(null, [
            Validators.required,
            Validators.pattern(/^[^0]([0-9]){7}$/),
          ]),
          first_name: this.fb.control('', [Validators.required]),
          last_name: this.fb.control('', [Validators.required]),
          age: this.fb.control(null, Validators.required),
          zone: this.fb.control(null, [Validators.required]),
          address: this.fb.control(null, [Validators.required]),
          // These two are not showed in UI, we add them so we can patch
          latitude: this.fb.control(null, [Validators.required]),
          longitude: this.fb.control(null, [Validators.required]),
          entrance: this.fb.control(null, Validators.pattern(/^[0-9]+$/)),
          floor: this.fb.control(null, Validators.pattern(/^[0-9]+$/)),
          apartment: this.fb.control(null, Validators.pattern(/^[0-9]+$/)),
          special_condition: this.fb.control('', [Validators.required]),
        })
      : undefined,
    type: this.fb.control(null, [Validators.required]),
    has_symptoms: this.fb.control(null, [Validators.required]),
    comments: this.fb.control(null),
    secret: this.fb.control(generateSecret(), Validators.required),
    urgent: this.fb.control(false),
  });

  constructor(
    private demandsFacade: DemandsFacade,
    private snackBar: MatSnackBar,
    private beneficiariesService: BeneficiariesService,
    private beneficiariesFacade: BeneficiariesFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public demand: Demand | null,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private matDialog: MatDialog,
  ) {
    this.form.patchValue(demand ?? {});
  }

  ngOnInit() {
    this.subscriptions.add(
      this.form
        .get('beneficiary.phone')
        ?.valueChanges.pipe(
          debounceTime(700),
          distinctUntilChanged(),
          filter((phone: string) => /^\d+$/.test(phone)),
          switchMap((phone: string) =>
            this.beneficiariesService.getBeneficiariesByFilter({ phone }),
          ),
        )
        .subscribe((response) => {
          this.foundBeneficiaries = response.list.slice(0, 3);
          this.foundBeneficiariesIsOpen = this.foundBeneficiaries.length > 0;
          this.cdr.detectChanges();
        }),
    );
  }

  onSubmit(status: DemandStatus = DemandStatus.confirmed) {
    if (this.form.invalid) return;

    if (!this.selectedBeneficiary) {
      this.beneficiariesFacade.saveBeneficiary({
        ...this.form.value.beneficiary,
        special_condition:
          this.form.value.beneficiary.special_condition === 'none'
            ? undefined
            : this.form.value.beneficiary.special_condition,
      });
    }

    const $beneficiary = this.selectedBeneficiary
      ? from([this.selectedBeneficiary])
      : this.beneficiariesFacade.beneficiaryDetails$.pipe(filter(isRecord));

    this.subscriptions.add(
      $beneficiary.subscribe((ben) => {
        return this.demandsFacade.saveDemand({
          status,
          ...this.form.value,
          _id: this.demand?._id,
          beneficiary: this.demand ? undefined : ben._id,
        });
      }),
    );

    combineLatest([this.demandsFacade.isLoading$, this.demandsFacade.error$])
      .pipe(
        filter(([status, error]) => !status && !error),
        first(),
      )
      .subscribe(() => {
        this.snackBar.open('Cererea a fost salvată cu success.', '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  regenerateSecret() {
    this.form.get('secret')?.patchValue(generateSecret());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getFullAddress(ben: Beneficiary): string {
    const parts = [
      {
        key: 'short_entrance',
        value: ben.entrance,
      },
      {
        key: 'short_floor',
        value: ben.floor,
      },
      {
        key: 'short_apartment',
        value: ben.apartment,
      },
    ]
      .filter((p) => p.value)
      .map((p) => `${this.translate.instant(p.key)} ${p.value}`);

    return [ben.address, ...parts].join(', ');
  }

  selectExistingBeneficiary(ben: Beneficiary) {
    this.selectedBeneficiary = ben;
    this.foundBeneficiariesIsOpen = false;
    this.form.removeControl('beneficiary');
  }

  getDemandNextStatus(demand: Demand): DemandStatus {
    if (demand.status === DemandStatus.new) return DemandStatus.confirmed;
    if (demand.status === DemandStatus.in_process) return DemandStatus.solved;
    return demand.status;
  }

  selectAddress() {
    this.matDialog
      .open(EsriMapComponent, {
        data: {
          coors: this.demand
            ? [
                this.demand?.beneficiary.latitude,
                this.demand?.beneficiary.longitude,
              ]
            : undefined,
          address: this.demand?.beneficiary.address,
        },
        panelClass: 'cdk-overlay-pane-no-padding',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .subscribe((data) => this.form.get('beneficiary')?.patchValue(data));
  }
}
