import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BasedEntity {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id!: number;

    @CreateDateColumn({ type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP' })
    readonly createdDt!: Date;

    @CreateDateColumn({ type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP' })
    readonly updatedDt!: Date;
}

export abstract class BasedDeletableEntity extends BasedEntity {
    @DeleteDateColumn({ type: 'timestamp', precision: 0, default: null })
    readonly deletedDt!: Date;
}
