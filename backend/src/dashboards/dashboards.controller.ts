import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('dashboards')
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get('overview')
  getOverview() {
    return this.dashboardsService.getOverview();
  }
}
