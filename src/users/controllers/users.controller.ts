import {
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO, UserToProjectDTO } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ProjectDTO } from 'src/projects/dto/project.dto';

@ApiTags('Users') // para la documentacion de Swagger
@Controller('users')
@UseGuards(AuthGuard, RolesGuard) // nos permite manejar guardianes y decoradores de Auth
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @ApiParam({ name: 'projectId' }) // pata la documentacion de swagger
  @AccessLevel('OWNER')
  @Post('add-to-project/:projectId')
  public async addToProject(
    @Body() body: UserToProjectDTO,
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.userService.relationToProject({
      ...body,
      project: id as unknown as ProjectsEntity,
    });
  }

  @Get('all')
  public async findAllUsers() {
    return await this.userService.findUsers();
  }

  @ApiParam({ name: 'id' }) // pata la documentacion de swagger
  @ApiHeader({
    // documentacion de swagger
    name: 'auth_token',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario sin password',
    schema: {
      allOf: [
        // { $ref: getSchemaPath(UserDTO) },
        {
          properties: {
            id: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
            },
            updatedAt: {
              type: 'string',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
            email: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            role: {
              type: 'string',
            },
            projectsIncludes: {
              type: 'array',
              items: {
                properties: {
                  id: { type: 'string' },
                  accessLevel: { type: 'number' },
                  project: {
                    $ref: getSchemaPath(ProjectDTO),
                  },
                },
              },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'No se encontró al usuario',
  })
  @PublicAccess() // decorador creado por nosotros para darle acceso publico
  @Get(':id')
  public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findUserById(id);
  }

  @ApiParam({ name: 'id' }) // pata la documentacion de swagger
  @Patch('edit/:id')
  public async editUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @ApiParam({ name: 'id' }) // pata la documentacion de swagger
  @Delete('delete/:id')
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteUser(id);
  }
}
