import { inject } from '@angular/core'; // Permite inyección de dependencias en funciones standalone
import { Router, type CanActivateFn } from '@angular/router'; // Interfaces y servicios para manejo de rutas
import { AuthService } from '../services/auth.service'; // Servicio para manejar la autenticación

// Guard para validar si el usuario está autenticado
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el servicio de enrutamiento

  if (authService.isAuthenticated()) { 
    // Si el usuario está autenticado, permite el acceso a la ruta
    return true;
  }

  // Si no está autenticado, redirige a la página de login
  router.navigate(['/auth/login']);
  return false; // Bloquea el acceso a la ruta
};

// Guard para validar si el usuario tiene rol de administrador
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el servicio de enrutamiento

  if (authService.isAuthenticated() && authService.isAdmin()) {
    // Si el usuario está autenticado y tiene rol de administrador, permite el acceso
    return true;
  }

  // Si no cumple con las condiciones, redirige a la página de login
  router.navigate(['/auth/login']);
  return false; // Bloquea el acceso a la ruta
};
